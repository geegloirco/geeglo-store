package ir.geeglo.dev.store.admin.rest;

import ir.piana.dev.core.annotation.*;
import ir.piana.dev.core.response.PianaResponse;
import ir.piana.dev.core.role.RoleType;
import ir.piana.dev.core.session.Session;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response.Status;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
@Handler(baseUrl = "authorize", handlerType = HandlerType.METHOD_HANDLER)
public class AuthorizeHandler {
    @MethodHandler(requiredRole = RoleType.GUEST)
    public static PianaResponse init(@SessionParam Session session) {
        Object existance = session.getExistance();
        Map<String, String> map = new LinkedHashMap<String, String>();
        map.put("session-key", session.getSessionKey());
        if (existance != null && existance instanceof String) {
            map.put("username", "admin");
            return new PianaResponse(Status.OK, 0, map);
        }else {
            return new PianaResponse(Status.OK, 1, map);
        }
    }

    @MethodHandler(requiredRole = RoleType.GUEST, httpMethod = "POST")
    @Path("login")
    public static PianaResponse login(
            @BodyObjectParam Map<String, String> map,
            @SessionParam Session session)
            throws Exception {
        if(map.get("username").equalsIgnoreCase("admin") &&
                map.get("password").equalsIgnoreCase("AsadMasad@1366")) {
            session.setExistance(map.get("password"));
            session.setRoleType(RoleType.ADMIN);
            return new PianaResponse(Status.OK, 0, "admin");
        }

        return new PianaResponse(Status.OK, 1, null);
    }

    @MethodHandler(requiredRole = RoleType.USER, httpMethod = "POST")
    @Path("logout")
    public static PianaResponse logout(@SessionParam Session session) {
        session.setExistance(null);
        session.setRoleType(RoleType.GUEST);
        return new PianaResponse(Status.OK, 0, null);
    }
}
