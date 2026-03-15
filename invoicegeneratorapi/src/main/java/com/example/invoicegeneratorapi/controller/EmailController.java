package com.example.invoicegeneratorapi.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin("*")
public class EmailController {

    @PostMapping("/send-email")
    public String sendEmail(
            @RequestParam("file") MultipartFile file,
            @RequestParam("email") String email) {

        return "Email simulation successful! Invoice would be sent to: " + email;
    }
}