
package com.bootx.controller.api;

import com.bootx.common.Result;
import com.bootx.pojo.ModelListPojo;
import com.bootx.service.ModelService;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author black
 */
@RestController("ApiIndexController")
@RequestMapping("/api")
public class IndexController extends BaseController {

	@Resource
	private ModelService modelService;

	@PostMapping
	public Result index(String method,String modelId){
		if(StringUtils.equalsIgnoreCase(method,"models/list")){
			return Result.success(modelService.list().getData());
		}else if(StringUtils.equalsIgnoreCase(method,"models/detail")){
			return Result.success(modelService.detail(modelId));
		}
		return Result.success();
	}

}