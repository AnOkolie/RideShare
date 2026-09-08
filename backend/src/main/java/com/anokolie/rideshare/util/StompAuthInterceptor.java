package com.anokolie.rideshare.util;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import org.springframework.security.access.AccessDeniedException;
import java.util.Collection;
import java.util.List;

@Component
@RequiredArgsConstructor
public class StompAuthInterceptor implements ChannelInterceptor {
    private final JwtDecoder jwtDecoder;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(
                        message,
                        StompHeaderAccessor.class
                );

        if (!StompCommand.CONNECT.equals(accessor.getCommand())) {
            return message;
        }

        String authorization =
                accessor.getFirstNativeHeader("Authorization");

        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new AccessDeniedException("Missing bearer token");
        }

        try {
            String token = authorization.substring(7);
            Jwt jwt = jwtDecoder.decode(token);

            // Important for Cognito access tokens.
            if (!"access".equals(jwt.getClaimAsString("token_use"))) {
                throw new AccessDeniedException("Access token required");
            }

            var authorities =
                    extractAuthorities(jwt);

            Authentication authentication =
                    new JwtAuthenticationToken(jwt, authorities);

            // Stores the authenticated principal on this STOMP session.
            accessor.setUser(authentication);

            return message;
        } catch (JwtException | AccessDeniedException exception) {
            throw new AccessDeniedException("Invalid or expired token");
        }
    }

    private Collection<SimpleGrantedAuthority> extractAuthorities(Jwt jwt) {
        List<String> groups = jwt.getClaimAsStringList("cognito:groups");

        if (groups == null) {
            return List.of();
        }

        return groups.stream()
                .map(group -> new SimpleGrantedAuthority(
                        "ROLE_" + group.toUpperCase()
                ))
                .toList();
    }
}
