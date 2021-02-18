package com.ssmeadows.web.service;

import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.UUID;

@Component
public class WebService {

    public String generateStudioId() {
        return UUID.randomUUID().toString();
    }

    public void updateDefaultModel(final Map<String, Object> model) {
        /*boolean debug = PropertyManager.isDebug();
        boolean prod = PropertyManager.isProd();

        model.put("DEBUG", debug);
        model.put("PROD", prod);*/
    }

    public String getFullURL(final HttpServletRequest request) {
        StringBuffer requestURL = request.getRequestURL();
        String queryString = request.getQueryString();

        if (queryString == null) {
            return requestURL.toString();
        } else {
            return requestURL.append('?').append(queryString).toString();
        }
    }
}
