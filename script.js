
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const resultDiv = document.createElement("div");
    resultDiv.className = "result";
    form.appendChild(resultDiv);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let score = 0;

        const answers = {
            js1: '2',
            js2: '2',
            js3: '1',
            js4: '1',
            js5: '1',
            js6: '1',
            js7: '1',
            js8: '1',
            js9: '1',
            js10: '1',
            java1: '2',
            java2: '1',
            java3: '2',
            java4: '4',
            java5: '1',
            java6: '2',
            java7: '1',
            java8: '1',
            java9: '1',
            java10: '1'
        };


        for (let key in answers) {
            const selected = form.querySelector(`input[name="${key}"]:checked`);
            if (selected && selected.value === answers[key]) {
                score++;
            }
        }

        // 正答率を計算
        const percentage = Math.round((score / Object.keys(answers).length) * 100);

        // 結果メッセージを決定
        let message = '';
        if (percentage >= 90) {
            message = '🎉 素晴らしい！ほぼ完璧です！';
        } else if (percentage >= 70) {
            message = '👍 よくできました！';
        } else if (percentage >= 50) {
            message = '📚 もう少し頑張りましょう！';
        } else {
            message = '💪 復習が必要ですね。頑張りましょう！';
        }

        resultDiv.innerHTML = `
            <div style="text-align: center; padding: 30px; margin: 20px 0; border: 2px solid #2196F3; border-radius: 10px; background: #f9f9f9; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h2 style="color: #333; margin-bottom: 20px;">🎯 クイズ結果</h2>
                
                <div style="font-size: 3em; font-weight: bold; color: #2196F3; margin: 20px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
                    あなたの正解数は <span style="color: #4CAF50;">${score}</span> / ${Object.keys(answers).length} です
                </div>
                
                <div style="font-size: 1.5em; margin: 15px 0; color: #666;">
                    正答率: <strong style="color: #FF9800;">${percentage}%</strong>
                </div>
                
                <div style="font-size: 1.2em; margin: 15px 0; color: #333;">
                    ${message}
                </div>
            </div>
        `;
    });
});

function addUsernameForm() {
    const form = document.querySelector("form");
    const usernameDiv = document.createElement("div");
    usernameDiv.className = "username-form";
    usernameDiv.innerHTML = `<h3>👤 ユーザー名を入力してください</h3>
        <input type="text" id="username" placeholder="ユーザー名" maxlength="50" required>
        <button type="button" onclick="startQuiz()">クイズ開始</button>
        <div style="margin-top: 10px;">
            <a href="/quiz/ranking" class="btn btn-secondary">ランキングを見る</a>
        </div>
        `;

        form.parentNode.insertBefore(usernameDiv,form);
        form.style.display = "none";
}

 // ランキング表示エリアを作成
    function createRankingArea() {
        const form = document.querySelector("form");
        if (!form) return;
        
        const rankingDiv = document.createElement("div");
        rankingDiv.className = "ranking-container";
        rankingDiv.id = "ranking-container";
        rankingDiv.style.display = "none";
        rankingDiv.innerHTML = `
            <div class="ranking-header">
                <h2>🏆 クイズランキング</h2>
                <button onclick="backToUsername()" class="btn btn-back">← 戻る</button>
            </div>
            <div id="ranking-content">
                <div class="loading">📊 ランキングを読み込み中...</div>
            </div>
            <div class="ranking-navigation">
                <button onclick="backToUsername()" class="btn btn-primary">新しくクイズに挑戦</button>
            </div>
        `;
        
        form.parentNode.insertBefore(rankingDiv, form);
    }
function startQuiz() {
    const username = document.getElementById("username").value.trim();
    if(!username) {
        alert("ユーザー名を入力してください");
        return;
    }

    document.querySelector(".username-form").style.display = "none";
    document.querySelector("form").style.display = "block";

    // ユーザー名を保存
    sessionStorage.setItem("quizUsername", username);
}

// 結果保存機能を既存のsubmitイベントに追加
function saveQuizResult(score, totalQuestions, percentage) {
    const username = sessionStorage.getItem("quizUsername");
    if (!username) return;
    
    const resultData = {
        username: username,
        score: score,
        totalQuestions: totalQuestions,
        percentage: percentage
    };
    
    fetch('/quiz/save-result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('結果が保存されました');
            // ランキングリンクを追加
            addRankingLink();
        } else {
            console.error('保存に失敗しました:', data.message);
        }
    })
    .catch(error => {
        console.error('エラー:', error);
    });
}

// ランキングリンクを結果に追加
function addRankingLink() {
    const resultDiv = document.querySelector(".result");
    const linkDiv = document.createElement("div");
    linkDiv.style.marginTop = "20px";
    linkDiv.innerHTML = `
        <a href="/quiz/ranking" class="btn btn-secondary">🏆 ランキングを見る</a>
        <button onclick="location.reload()" class="btn btn-primary">もう一度挑戦</button>
    `;
    resultDiv.appendChild(linkDiv);
}

// ページ読み込み時にユーザー名フォームを追加
document.addEventListener("DOMContentLoaded", function() {
    addUsernameForm();
    
    // 既存のsubmitイベントリスナーを拡張
    const form = document.querySelector("form");
    const originalSubmitHandler = form.onsubmit;
    
    form.addEventListener("submit", function(event) {
        // 既存の処理を実行後、結果を保存
        setTimeout(() => {
            const scoreElement = document.querySelector(".result span[style*='color: #4CAF50']");
            if (scoreElement) {
                const scoreText = scoreElement.textContent;
                const score = parseInt(scoreText);
                const totalQuestions = 20; // 固定値
                const percentage = Math.round((score / totalQuestions) * 100);
                
                saveQuizResult(score, totalQuestions, percentage);
            }
        }, 100);
    });
});