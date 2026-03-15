package com.example.invoicegeneratorapi.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.example.invoicegeneratorapi.entity.Invoice;
import com.example.invoicegeneratorapi.repository.InvoiceRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public Invoice saveInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id).orElseThrow();
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }
}