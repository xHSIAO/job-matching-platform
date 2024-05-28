document.getElementById('jobSeekerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;

    const apiToken = 'patXcGiDcBztPm5TK.b7f5df84feeeb7889076e6b1b5861cf21666f04974eac26f0460302a04f74211';
    const baseId = 'appTdqIUs9e5N1J2h';
    const tableId = 'tblHvWLGazbOzpiEq';

    const data = {
        records: [
            {
                fields: {
                    Name: name,
                    Email: email,
                    Skills: skills,
                    Experience: experience
                }
            }
        ]
    };

    try {
        const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        alert('提交成功！');
        localStorage.setItem('jobSeekerInfo', JSON.stringify({ name, email, skills, experience }));
    } catch (error) {
        console.error('Error:', error);
        alert('提交失败，请重试。');
    }
});

document.getElementById('generateResume').addEventListener('click', function() {
    const jobSeekerInfo = JSON.parse(localStorage.getItem('jobSeekerInfo'));
    if (!jobSeekerInfo) {
        alert('请先提交您的信息。');
        return;
    }

    const resumeContent = `
        姓名: ${jobSeekerInfo.name}\n
        邮箱: ${jobSeekerInfo.email}\n
        技能: ${jobSeekerInfo.skills}\n
        工作经验: ${jobSeekerInfo.experience}\n
    `;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${jobSeekerInfo.name}_resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
});
