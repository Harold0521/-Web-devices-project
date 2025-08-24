package com.example.test_java_maven.controller;

import com.example.test_java_maven.model.Devices;
import com.example.test_java_maven.repository.DevicesRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/devices")
public class DevicesController {

    private final DevicesRepository devicesRepository;

    public DevicesController(DevicesRepository devicesRepository) {
        this.devicesRepository = devicesRepository;
    }

    @GetMapping
    public List<Devices> obtenerDevices() {
        return devicesRepository.findAll();
    }

}
