
package com.webpage.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class HeaderJson {

    private Header header;
    private Body body;
    public void setHeader(Header header) {
         this.header = header;
     }
     public Header getHeader() {
         return header;
     }

    public void setBody(Body body) {
         this.body = body;
     }
     public Body getBody() {
         return body;
     }

}