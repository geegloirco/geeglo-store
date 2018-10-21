package ir.geeglo.dev.store.model;

import java.util.Map;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
public class UserModel {
    private String username;
    private String image;
    private String sessionKey;
    private Map cart;

    public UserModel() {

    }

    public UserModel(String username, String imageSrc, String sessionKey, Map cart) {
        this.username = username;
        this.image = imageSrc;
        this.sessionKey = sessionKey;
        this.cart = cart;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getSessionKey() {
        return sessionKey;
    }

    public void setSessionKey(String sessionKey) {
        this.sessionKey = sessionKey;
    }

    public Map getCart() {
        return cart;
    }

    public void setCart(Map cart) {
        this.cart = cart;
    }
}
