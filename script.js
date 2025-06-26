
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

        // ここを修正：textContent → innerHTML に変更し、スタイルを追加
        resultDiv.innerHTML = `
            <div style="text-align: center; padding: 30px; margin: 20px 0; border: 2px solid #2196F3; border-radius: 10px; background: #f9f9f9;">
                <div style="font-size: 3em; font-weight: bold; color: #2196F3; margin: 20px 0;">
                    あなたの正解数は <span style="color: #4CAF50;">${score}</span> / ${Object.keys(answers).length} です
                </div>
            </div>
        `;
    });
});
