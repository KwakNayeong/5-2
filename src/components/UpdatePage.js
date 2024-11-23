import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdatePage({ entries, onUpdate }) {
    const { id } = useParams(); // URL 파라미터로부터 ID 가져오기
    const navigate = useNavigate();
    const entry = entries.find((item) => item.id === id);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        date: "",
        day: "",
        weather: "",
    });
    const [editCount, setEditCount] = useState(0); // 수정 횟수 기록

    const titleRef = useRef(null); // 제목 입력 유효성 검사용

    useEffect(() => {
        if (entry) {
            setFormData(entry);
        }
    }, [entry]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setEditCount((prev) => prev + 1); // 수정 횟수 증가

        // API에 실시간 업데이트
        try {
            await fetch(`https://672d8ee1fd8979715642c8e9.mockapi.io/diary/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, [name]: value }),
            });
        } catch (err) {
            console.error("API 업데이트 실패:", err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title) {
            alert("제목을 입력하세요.");
            titleRef.current.focus();
            return;
        }
        onUpdate(formData); // 부모 컴포넌트로 업데이트 데이터 전달
        navigate("/list"); // 업데이트 후 목록으로 이동
    };

    if (!entry) return <p>일기를 찾을 수 없습니다.</p>;

    return (
        <div className="container mt-4">
            <h2>일기 수정</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>제목:</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        ref={titleRef}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>내용:</label>
                    <textarea
                        name="content"
                        className="form-control"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>날짜:</label>
                    <input
                        type="date"
                        name="date"
                        className="form-control"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                        <label>요일:</label>
                        <input
                            type="day"
                            name="day"
                            className="form-control"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                <div className="form-group">
                    <label>날씨:</label>
                    <input
                        type="text"
                        name="weather"
                        className="form-control"
                        value={formData.weather}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    저장
                </button>
            </form>
            <p className="mt-3">수정 횟수: {editCount}</p>
        </div>
    );
}

export default UpdatePage;
