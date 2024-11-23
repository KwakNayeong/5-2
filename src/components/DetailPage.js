import React from "react";
import { useParams, Link } from "react-router-dom";

function DetailPage({ entries }) {
    const { id } = useParams(); // URL에서 ID 가져오기
    const entry = entries.find((item) => item.id === id); // ID에 해당하는 항목 찾기

    if (!entry) {
        return <p>일기를 찾을 수 없습니다.</p>;
    }

    return (
        <div className="container mt-4">
            <h1>일기 상세 보기</h1>
            <p><strong>제목:</strong> {entry.title}</p>
            <p><strong>내용:</strong> {entry.content}</p>
            <p><strong>날짜:</strong> {entry.date}</p>
            <p><strong>날씨:</strong> {entry.weather}</p>
            <Link to="/list" className="btn btn-secondary mt-3">
                목록으로 돌아가기
            </Link>
        </div>
    );
}

export default DetailPage;
