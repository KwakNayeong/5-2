import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DiaryList from "./DiaryList";
import DetailPage from "./DetailPage";
import UpdatePage from "./UpdatePage";
import CreatePage from "./CreatePage";
import "./App.css";

// Function to dynamically load a CSS file
function loadCSS(url) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
}

// Function to dynamically load a JS file
function loadJS(url, callback = null) {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => {
        if (callback) callback();
    };
    document.body.appendChild(script);
}

// Load CSS files
loadCSS("https://fonts.googleapis.com/css?family=Roboto");
loadCSS("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");
loadCSS("https://fonts.googleapis.com/icon?family=Material+Icons");
loadCSS("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
loadCSS("/App.css"); // Custom CSS

// Load JS files
loadJS("https://code.jquery.com/jquery-3.5.1.min.js", () => {
    console.log("jQuery loaded");
});
loadJS("https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js", () => {
    console.log("Popper.js loaded");
});
loadJS("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js", () => {
    console.log("Bootstrap JS loaded");
});

const API_URL = "https://672d8ee1fd8979715642c8e9.mockapi.io/diary";

function App() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    // API에서 데이터 가져오기
    const fetchDiaryEntries = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
            const data = await response.json();
            setEntries(data);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiaryEntries();
    }, []);

    const handleAddOrUpdate = async (entry) => {
        try {
            if (entry.id) {
                // Update existing entry
                await fetch(`${API_URL}/${entry.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(entry),
                });
            } else {
                // Add new entry
                await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(entry),
                });
            }
            fetchDiaryEntries(); // 데이터 갱신
        } catch (err) {
            console.error("데이터 추가/수정 중 오류 발생:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("이 일기를 삭제하시겠습니까?")) return;
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            fetchDiaryEntries(); // 데이터 갱신
        } catch (err) {
            console.error("삭제 실패:", err);
        }
    };

    if (loading) return <p>로딩 중...</p>;

    return (
        <Router>
            <div className="container">
                <h1 className="mt-4">일기 앱</h1>
                <button
                    className="btn btn-success my-3"
                    onClick={() => (window.location.href = "/create")}
                >
                    새 일기 추가
                </button>
                <Routes>
                    <Route path="/" element={<Navigate to="/list" replace />} />
                    <Route
                        path="/list"
                        element={<DiaryList entries={entries} onDelete={handleDelete} />}
                    />
                    <Route
                        path="/detail/:id"
                        element={<DetailPage entries={entries} />}
                    />
                    <Route
                        path="/update/:id"
                        element={<UpdatePage entries={entries} onUpdate={handleAddOrUpdate} />}
                    />
                    <Route
                        path="/create"
                        element={<CreatePage onCreate={handleAddOrUpdate} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
