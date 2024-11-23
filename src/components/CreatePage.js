import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function CreatePage({ onCreate }) {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        date: "",
        day: "",
        weather: "",
    });

    const titleRef = useRef(null); // 제목 입력 유효성 검사
    const contentRef = useRef(null); // 내용 입력 유효성 검사
    const dayRef = useRef(null); // 요일 입력 유효성 검사
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 입력값 유효성 검사
        if (!formData.title) {
            alert("제목을 입력하세요.");
            titleRef.current.focus();
            return;
        }
        if (!formData.content) {
            alert("내용을 입력하세요.");
            contentRef.current.focus();
            return;
        }
        if (!formData.day || !["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"].includes(formData.day)) {
            alert("올바른 요일(월요일, 화요일, 수요일, 목요일, 금요일, 토요일, 일요일)을 입력하세요.");
            dayRef.current.focus();
            return;
        }

        // onCreate 함수를 호출하여 데이터 추가
        onCreate(formData);

        // 리스트 페이지로 리디렉션
        navigate("/list");
    };

    return (
        <div className="container mt-4">
            <h2>새 일기 작성</h2>
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
                        ref={contentRef}
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
                        type="text"
                        name="day"
                        className="form-control"
                        placeholder="월요일, 화요일, 수요일, 목요일, 금요일, 토요일, 일요일 중 하나"
                        value={formData.day}
                        onChange={handleChange}
                        ref={dayRef}
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
        </div>
    );
}

export default CreatePage;
