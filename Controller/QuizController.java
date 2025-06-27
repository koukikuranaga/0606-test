// QuizController.java
package com.example.quiz.controller;

import com.example.quiz.entity.QuizResult;
import com.example.quiz.service.QuizResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@Controller

public class QuizController {
    
    @Autowired
    private QuizResultService quizResultService;
    
    // クイズページ表示
    @GetMapping
    public String showQuiz() {
        return "index"; // 既存のindex.htmlをquiz.htmlにリネーム
    }
     // クイズページも同じindex.htmlを表示
    @GetMapping("/quiz")  // ← 修正（フルパスで指定）
    public String showQuiz() {
        return "index";  // ← quiz → index に変更
    }
    
}
