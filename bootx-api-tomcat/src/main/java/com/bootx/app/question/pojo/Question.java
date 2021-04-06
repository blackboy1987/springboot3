/**
  * Copyright 2021 json.cn 
  */
package com.bootx.app.question.pojo;
import java.util.List;

/**
 * Auto-generated: 2021-03-09 14:11:55
 *
 * @author json.cn (i@json.cn)
 * @website http://www.json.cn/java2pojo/
 */
public class Question {

    private String title;
    private String image;
    private List<Answers> answers;
    public void setTitle(String title) {
         this.title = title;
     }
     public String getTitle() {
         return title;
     }

    public void setImage(String image) {
         this.image = image;
     }
     public String getImage() {
         return image;
     }

    public void setAnswers(List<Answers> answers) {
         this.answers = answers;
     }
     public List<Answers> getAnswers() {
         return answers;
     }

}