import React from "react";
import { Link } from "react-router-dom";

function DiaryList({ entries, onDelete }) {
    return (
        <table className="table table-striped mt-4">
            <thead>
                <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>년/월/일</th>
                    <th>요일</th>
                    <th>날씨</th>
                    <th>기타</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry, index) => (
                    <tr key={entry.id}>
                        <td>{index + 1}</td>
                        <td>{entry.title}</td>
                        <td>{entry.content}</td>
                        <td>{entry.date}</td>
                        <td>{entry.day}</td>
                        <td>{entry.weather}</td>
                        <td>
                            {/* View 버튼 */}
                            <Link to={`/detail/${entry.id}`} className="btn btn-info btn-sm me-2">
                                <i className="fa fa-eye"></i>
                            </Link>
                            {/* Edit 버튼 */}
                            <Link to={`/update/${entry.id}`} className="btn btn-primary btn-sm me-2">
                                <i className="fa fa-pencil"></i>
                            </Link>
                            {/* Delete 버튼 */}
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => onDelete(entry.id)}
                            >
                                <i className="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DiaryList;
