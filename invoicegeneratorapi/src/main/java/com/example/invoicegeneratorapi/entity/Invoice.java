package com.example.invoicegeneratorapi.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.Instant;
import java.util.List;

@Data
@Entity
@Table(name = "invoices")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String notes;
    @Column(columnDefinition = "LONGTEXT")
    private String logo;
    private Double tax;

    private Double subtotal;
    private Double total;

    private Instant createdAt;
    private Instant lastUpdatedAt;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String thumbnailUrl;

    private String template;
    private String title;

    @Embedded
    private Company company;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "name", column = @Column(name = "billing_name")),
            @AttributeOverride(name = "address", column = @Column(name = "billing_address")),
            @AttributeOverride(name = "phone", column = @Column(name = "billing_phone"))
    })
    private Billing billing;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "name", column = @Column(name = "shipping_name")),
            @AttributeOverride(name = "address", column = @Column(name = "shipping_address")),
            @AttributeOverride(name = "phone", column = @Column(name = "shipping_phone"))
    })
    private Shipping shipping;

    @Embedded
    private InvoiceDetails invoice;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "invoice_items", joinColumns = @JoinColumn(name = "invoice_id"))
    @OrderColumn(name = "item_index")
    private List<Item> items;

    @PrePersist
    @PreUpdate
    public void beforeSave() {

        double subtotalValue = 0;

        if (items != null) {
            for (Item item : items) {
                if (item != null && item.getQty() != null && item.getAmount() != null) {
                    subtotalValue += item.getQty() * item.getAmount();
                }
            }
        }

        this.subtotal = subtotalValue;

        if (tax != null) {
            this.total = subtotalValue + (subtotalValue * tax / 100);
        } else {
            this.total = subtotalValue;
        }

        if (createdAt == null) {
            createdAt = Instant.now();
        }

        lastUpdatedAt = Instant.now();
    }

    @Embeddable
    @Data
    public static class Company {
        private String name;
        private String address;
        private String phone;
    }

    @Embeddable
    @Data
    public static class Billing {
        private String name;
        private String address;
        private String phone;
    }

    @Embeddable
    @Data
    public static class Shipping {
        private String name;
        private String address;
        private String phone;
    }

    @Embeddable
    @Data
    public static class InvoiceDetails {
        private String number;
        private String date;
        private String dueDate;
    }

    @Embeddable
    @Data
    public static class Item {
        private String name;
        private Integer qty;
        private Double amount;
        private String description;
    }
}