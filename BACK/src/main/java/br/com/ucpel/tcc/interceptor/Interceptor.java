package br.com.ucpel.tcc.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Interceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
//		if (DispatcherType.REQUEST.name().equals(request.getDispatcherType().name())
//				&& request.getMethod().equals(HttpMethod.GET.name())) {
//			service.logRequest(request, null);
//		}
		return true;
	}

}
