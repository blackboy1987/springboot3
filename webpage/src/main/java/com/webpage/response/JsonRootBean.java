
package com.webpage.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.webpage.request.Header;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonRootBean {

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