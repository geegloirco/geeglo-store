package ir.geeglo.dev.store.model;

/**
 * @author Mohammad Rahmati, 10/15/2018
 */
public class ItemModel {
    private int id;
    private String title;
    private int count;
    private int price;
    private String image;

    public ItemModel() {
    }

    public ItemModel(int id, String title, int count, int price, String image) {
        this.id = id;
        this.title = title;
        this.count = count;
        this.price = price;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
