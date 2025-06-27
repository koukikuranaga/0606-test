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
    // 結果保存（Ajax用）
    @PostMapping("/save-result")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> saveResult(@RequestBody Map<String, Object> request) {
        try {
            String username = (String) request.get("username");
            Integer score = (Integer) request.get("score");
            Integer totalQuestions = (Integer) request.get("totalQuestions");
            
            QuizResult result = quizResultService.saveQuizResult(username, score, totalQuestions);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "結果が保存されました",
                "resultId", result.getId()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "保存に失敗しました: " + e.getMessage()
            ));
        }
    }
    
    // ランキング表示
    @GetMapping("/ranking")
    public String showRanking(Model model) {
        List<QuizResult> topScores = quizResultService.getTopScores();
        model.addAttribute("rankings", topScores);
        return "ranking";
    }
    
    // ユーザー履歴表示
    @GetMapping("/history/{username}")
    public String showUserHistory(@PathVariable String username, Model model) {
        List<QuizResult> userResults = quizResultService.getResultsByUsername(username);
        model.addAttribute("username", username);
        model.addAttribute("results", userResults);
        return "user-history";
    }
    
    // API: ユーザー履歴取得
    @GetMapping("/api/history/{username}")
    @ResponseBody
    public ResponseEntity<List<QuizResult>> getUserHistory(@PathVariable String username) {
        List<QuizResult> results = quizResultService.getResultsByUsername(username);
        return ResponseEntity.ok(results);
    }
}
    // QuizController.java に追加
    @GetMapping("/quiz/api/ranking")
    @ResponseBody
    public ResponseEntity<List<QuizResult>> getRankingData() {
        List<QuizResult> rankings = quizResultService.getTopScores();
        return ResponseEntity.ok(rankings);
}
