package com.example.test_java_maven.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.test_java_maven.model.Comments;
import com.example.test_java_maven.model.Devices;
import com.example.test_java_maven.repository.CommentsRepository;
import com.example.test_java_maven.repository.DevicesRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/comments")
public class CommentsController {

    private final CommentsRepository commentsRepository;
    private final DevicesRepository devicesRepository;

    public CommentsController(CommentsRepository commentsRepository, DevicesRepository devicesRepository) {
        this.commentsRepository = commentsRepository;
        this.devicesRepository = devicesRepository;
    }

    // GET: listar comentarios por device
    @GetMapping("/device/{deviceId}")
    public List<Comments> getCommentsByDevice(@PathVariable Long deviceId) {
        return commentsRepository.findByDevice_Id(deviceId);
    }

    // POST: agregar comentario
    @PostMapping("/device/{deviceId}")
    public Comments addComment(@PathVariable Long deviceId, @RequestBody Comments comment) {
        Devices device = devicesRepository.findById(deviceId)
                .orElseThrow(() -> new RuntimeException("Device no encontrado"));

        comment.setDevice(device);
        return commentsRepository.save(comment);
    }
}
