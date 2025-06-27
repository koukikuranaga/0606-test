// QuizResultService.java
package com.example.quiz.service;

import com.example.quiz.entity.QuizResult;
import com.example.quiz.repository.QuizResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuizResultService {
    
    @Autowired
    private QuizResultRepository quizResultRepository;
    
    // クイズ結果を保存
    public QuizResult saveQuizResult(String username, Integer score, Integer totalQuestions) {
        QuizResult quizResult = new QuizResult();
        quizResult.setUsername(username);
        quizResult.setScore(score);
        quizResult.setTotalQuestions(totalQuestions);
        quizResult.setPercentage(calculatePercentage(score, totalQuestions));
        quizResult.setPlayDate(LocalDateTime.now());
        
        return quizResultRepository.save(quizResult);
    }
    
    // 全結果取得
    public List<QuizResult> getAllResults() {
        return quizResultRepository.findAll();
    }
    
    // ユーザー別結果取得
    public List<QuizResult> getResultsByUsername(String username) {
        return quizResultRepository.findByUsernameOrderByPlayDateDesc(username);
    }
    
    // トップスコア取得
    public List<QuizResult> getTopScores() {
        return quizResultRepository.findTopScores();
    }
    
    // ユーザーの最高スコア取得
    public QuizResult getUserTopScore(String username) {
        return quizResultRepository.findTopScoreByUsername(username);
    }
    
    // パーセンテージ計算
    private Double calculatePercentage(Integer score, Integer totalQuestions) {
        if (totalQuestions == 0) return 0.0;
        return Math.round((double) score / totalQuestions * 100 * 100.0) / 100.0;
    }
}