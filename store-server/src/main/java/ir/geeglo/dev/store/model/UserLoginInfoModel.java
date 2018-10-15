package ir.geeglo.dev.store.model;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
public class UserLoginInfoModel {
    private String username;
    private String password;

    public UserLoginInfoModel() {

    }

    public UserLoginInfoModel(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
