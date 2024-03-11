
package com.bootx.controller.api;

import com.bootx.common.Result;
import com.bootx.entity.FileList;
import com.bootx.entity.OrderedEntity;
import com.bootx.pojo.FileListPojo;
import com.bootx.service.BaiDuAccessTokenService;
import com.bootx.service.FileListService;
import com.bootx.service.ModelService;
import com.bootx.service.RedisService;
import com.bootx.util.BaiDuUtils;
import com.bootx.util.FileUploadUtils;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

/**
 * @author black
 */
@RestController("ApiIndexController")
@RequestMapping("/api")
public class IndexController extends BaseController {

	@Resource
	private ModelService modelService;

	@Resource
	private BaiDuAccessTokenService baiDuAccessTokenService;

	@Resource
	private FileListService fileListService;

	@Resource
	private RedisService redisService;

	ExecutorService executor = Executors.newFixedThreadPool(4);


	@PostMapping
	public Result index(String method,String modelId){
		if(StringUtils.equalsIgnoreCase(method,"models/list")){
			return Result.success(modelService.list().getData());
		}else if(StringUtils.equalsIgnoreCase(method,"models/detail")){
			return Result.success(modelService.detail(modelId));
		}
		return Result.success();
	}

	@PostMapping("/category")
	public Result category(Long fsId){
		String token = baiDuAccessTokenService.getToken();
		FileList byFsId = fileListService.findByFsId(fsId);
		FileListPojo fileListPojo = BaiDuUtils.fileList(token, byFsId!=null?byFsId.getPath():"/shortVideo",0);
		List<FileListPojo.ListDTO> list = fileListPojo.getList();
		for (FileListPojo.ListDTO listDTO : list) {
			executor.submit(()->{
				// 保存自己
				FileList fileList = fileListService.create(listDTO, byFsId == null ? fileListService.find(1L) : byFsId);
				// 保存下级
				fileListService.saveChildren(fileList,token);
			});
		}
		return Result.success(list.stream().map(item->{
			Map<String,Object> map = new HashMap<>();
			map.put("name",item.getServerFilename());
			map.put("fsId",item.getFsId()+"");
			map.put("category",item.getCategory()+"");
			if (item.getThumbs()!=null && StringUtils.isNotBlank(item.getThumbs().getIcon())){
				map.put("cover",item.getThumbs().getIcon());
			}else{
				map.put("cover","https://bootx-video.oss-cn-hangzhou.aliyuncs.com/folder.png");
			}

			return map;
		}).collect(Collectors.toList()));
	}

	/**
	 * 获取播放地址
	 * @param fsId
	 * @return
	 * @throws InterruptedException
	 */
	@PostMapping("/getPlayUrl")
	public Result getPlayUrl(Long fsId) throws InterruptedException {
		String token = baiDuAccessTokenService.getToken();
		FileList byFsId = fileListService.findByFsId(fsId);
		if(StringUtils.isNoneBlank(byFsId.getPlayUrl())){
			return Result.success(byFsId.getPlayUrl());
		}
		String streaming = BaiDuUtils.streaming(token, byFsId.getPath());
		if(StringUtils.contains(streaming,"#EXT-X-ENDLIST")){
			String path = fsId+".m3u8";
			FileUploadUtils.upload(streaming,fsId+".m3u8");
			String url = "https://bootx-video.oss-cn-hangzhou.aliyuncs.com/"+path;
			executor.submit(()->{
				byFsId.setPlayUrl(url);
				fileListService.update(byFsId);
			});
			return Result.success(url);
		}
		Thread.sleep(2000);
		return getPlayUrl(fsId);
	}

	@PostMapping("/getAllPlayUrl")
	public Result getAllPlayUrl(Long fsId) throws InterruptedException {
		String token = baiDuAccessTokenService.getToken();
		FileList parent = fileListService.findByFsId(fsId);
		if(parent!=null){
			FileListPojo fileListPojo = BaiDuUtils.fileList(token, parent.getPath(),0);
			List<FileListPojo.ListDTO> list = fileListPojo.getList();
			for (FileListPojo.ListDTO listDTO : list) {
				FileList fileList = fileListService.create1(listDTO,parent);
				if(fileList!=null && fileList.getCategory()==1){
					String streaming = BaiDuUtils.streaming(token, fileList.getPath());
					while (!StringUtils.contains(streaming,"#EXT-X-ENDLIST")){
						streaming = BaiDuUtils.streaming(token, fileList.getPath());
						Thread.sleep(1000);
					}
					String path = fsId+".m3u8";
					FileUploadUtils.upload(streaming,fsId+".m3u8");
					String url = "https://bootx-video.oss-cn-hangzhou.aliyuncs.com/"+path;
					fileList.setPlayUrl(url);
					fileListService.update(fileList);
				}
			}
		}

		return getPlayUrl(fsId);
	}

	@PostMapping("/next")
	public Result next(Long fsId) throws InterruptedException {
		String token = baiDuAccessTokenService.getToken();
		FileList current = fileListService.findByFsId(fsId);
		Map<String,Object> data = new HashMap<>();
		if(current!=null){
			FileList next = fileListService.next(current);
			if(next!=null && next.getCategory()==1){
				String streaming = BaiDuUtils.streaming(token, next.getPath());
				while (!StringUtils.contains(streaming,"#EXT-X-ENDLIST")){
					streaming = BaiDuUtils.streaming(token, next.getPath());
					Thread.sleep(1000);
				}
				String path = next.getFsId()+".m3u8";
				FileUploadUtils.upload(streaming,next.getFsId()+".m3u8");
				String url = "https://bootx-video.oss-cn-hangzhou.aliyuncs.com/"+path;
				next.setPlayUrl(url);
				fileListService.update(next);
				data.put("playUrl",url);
				data.put("fsId",next.getFsId());
				return Result.success(data);
			}
		}
		return Result.error("没有下一集");
	}

	/**
	 * 获取目录下的全部数据
	 * @param id
	 * @return
	 */
	@PostMapping("/list")
	public Result list(Long id) {
		FileList fileList = fileListService.find(id);
		if(fileList==null){
			return Result.success(Collections.emptyList());
		}
		return Result.success(fileList.getChildren().stream().sorted(Comparator.comparingInt(OrderedEntity::getOrder)).filter(item->item.getCategory()==1).map(item->{
			Map<String,Object> map = new HashMap<>();
			map.put("name",item.getFileName());
			map.put("id",item.getFsId());
			map.put("cover",item.getCover());
			return map;
		}));
	}
}