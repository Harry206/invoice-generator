package com.example.invoicegeneratorapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.invoicegeneratorapi.entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

}