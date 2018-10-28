package ir.geeglo.dev.store.model;

import ir.geeglo.dev.store.data.entity.AddressEntity;
import ir.geeglo.dev.store.data.entity.UserEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
public class UserInfoModel {
    private String firstName;
    private String lastName;
    private String nationalCode;
//    private List<AddressModel> addresses;

    public UserInfoModel() {

    }

    public UserInfoModel(
            String firstName, String lastName,
            String nationalCode,
            List<AddressModel> addresses) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nationalCode = nationalCode;
//        this.addresses = addresses;
    }

    public UserInfoModel(
            UserEntity userEntity) {
        this.firstName = userEntity.getUserInfos().get(0).getFirstName();
        this.lastName = userEntity.getUserInfos().get(0).getLastName();
        this.nationalCode = userEntity.getUserInfos().get(0).getNationalCode();
//        this.addresses = new ArrayList<>();
//        for(AddressEntity addressEntity : userEntity.getAddressEntities()) {
//            this.addresses.add(new AddressModel(addressEntity));
//        }
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

//    public List<AddressModel> getAddresses() {
//        return addresses;
//    }

//    public void setAddresses(List<AddressModel> addresses) {
//        this.addresses = addresses;
//    }
}
