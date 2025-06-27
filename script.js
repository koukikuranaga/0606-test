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

        // 色付けとスコア計算
        for (let key in answers) {
            const selected = form.querySelector(`input[name="${key}"]:checked`);
            if (selected) {
                const label = selected.closest("label");
                if (selected.value === answers[key]) {
                    label.classList.add("correct");
                    score++;
                } else {
                    label.classList.add("incorrect");
                }
            }
        }

        const percentage = Math.round((score / Object.keys(answers).length) * 100);

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
         // 全ラジオボタンを無効化
    form.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.disabled = true;
    });

        const retryButton = document.createElement("button");
        retryButton.textContent = "もう一度挑戦";
        retryButton.className = "btn btn-primary";
        retryButton.onclick = () => {
            form.reset();
            resultDiv.innerHTML = "";
            document.querySelectorAll("label").forEach(label => {
                label.classList.remove("correct", "incorrect");
            });
              // ラジオボタンを再び有効化
            form.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.disabled = false;
            });
        };
        resultDiv.appendChild(retryButton);
    });
});
