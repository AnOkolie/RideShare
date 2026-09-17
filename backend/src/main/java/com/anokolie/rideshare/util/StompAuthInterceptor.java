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
public class StompAuthInterceptor
        implements ChannelInterceptor {

    private final JwtDecoder jwtDecoder;

    @Override
    public Message<?> preSend(
            Message<?> message,
            MessageChannel channel
    ) {
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message,StompHeaderAccessor.class);

        if (accessor == null) {
            return message;
        }

        System.out.println(
                "Inbound STOMP command: " + accessor.getCommand());

        if (!StompCommand.CONNECT.equals(accessor.getCommand())) {
            return message;
        }

        String authorization =accessor.getFirstNativeHeader("Authorization");

        System.out.println("Authorization present: "+ (authorization != null));

        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new AccessDeniedException("Missing bearer token");
        }

        String token = authorization.substring(7);

        final Jwt jwt;

        try {
            jwt = jwtDecoder.decode(token);
        } catch (JwtException e) {
            System.err.println(
                    "JWT decode failed: "
                            + e.getMessage()
            );

            throw new AccessDeniedException(
                    "Invalid or expired JWT",
                    e
            );
        }

        String tokenUse =
                jwt.getClaimAsString("token_use");

        System.out.println(
                "token_use: " + tokenUse
        );

        if (!"access".equals(tokenUse)) {
            throw new AccessDeniedException(
                    "Expected Cognito access token, received: "
                            + tokenUse
            );
        }

        var authorities =
                extractAuthorities(jwt);

        Authentication authentication =
                new JwtAuthenticationToken(
                        jwt,
                        authorities
                );

        accessor.setUser(authentication);

        System.out.println(
                "STOMP authenticated user: "
                        + authentication.getName()
        );

        return message;
    }

    private Collection<SimpleGrantedAuthority>
    extractAuthorities(Jwt jwt) {

        List<String> groups =
                jwt.getClaimAsStringList(
                        "cognito:groups"
                );

        if (groups == null) {
            return List.of();
        }

        return groups.stream()
                .map(group ->
                        new SimpleGrantedAuthority(
                                "ROLE_"
                                        + group.toUpperCase()
                        )
                )
                .toList();
    }
}