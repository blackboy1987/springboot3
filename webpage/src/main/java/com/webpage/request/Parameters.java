
package com.webpage.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.HashMap;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Parameters {

    private Map<String,Object> map = new HashMap<>();
    private String _parameters;
    private String _parameterTypes;
    private String dcID;
    private String _boId;
    private String _methodName;
    private String _methodParameterTypes;
    private String nom;

    public Map<String, Object> getMap() {
        return map;
    }

    public void setMap(Map<String, Object> map) {
        this.map = map;
    }

    public void set_parameters(String _parameters) {
         this._parameters = _parameters;
     }
     public String get_parameters() {
         return _parameters;
     }

    public void set_parameterTypes(String _parameterTypes) {
         this._parameterTypes = _parameterTypes;
     }
     public String get_parameterTypes() {
         return _parameterTypes;
     }

    public void setDcID(String dcID) {
         this.dcID = dcID;
     }
     public String getDcID() {
         return dcID;
     }

    public void set_boId(String _boId) {
         this._boId = _boId;
     }
     public String get_boId() {
         return _boId;
     }

    public void set_methodName(String _methodName) {
         this._methodName = _methodName;
     }
     public String get_methodName() {
         return _methodName;
     }

    public void set_methodParameterTypes(String _methodParameterTypes) {
         this._methodParameterTypes = _methodParameterTypes;
     }
     public String get_methodParameterTypes() {
         return _methodParameterTypes;
     }

    public void setNom(String nom) {
         this.nom = nom;
     }
     public String getNom() {
         return nom;
     }

}