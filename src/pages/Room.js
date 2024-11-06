// src/pages/Room.js
import React, { useState, useEffect, useContext } from 'react';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, addDoc, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { AuthContext } from '../AuthService';

const Room = () => {
    const [messages, setMessages] = useState([]); // メッセージを保存するステート
    const [value, setValue] = useState(''); // 入力フィールドの値を保存するステート
    const user = useContext(AuthContext); // ログイン中のユーザー情報を取得

    // Firestoreからリアルタイムでメッセージを取得
    useEffect(() => {
        const messagesQuery = query(collection(db, 'messages'), orderBy('timestamp')); // タイムスタンプで並べ替え
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => doc.data());
            setMessages(messagesData); // 取得したメッセージデータをステートに保存
        });
        return () => unsubscribe(); // クリーンアップでリスナーを解除
    }, []);

    // メッセージ送信の処理
    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) { // 空白メッセージの送信を防ぐ
            addDoc(collection(db, 'messages'), {
                content: value,
                user: user.displayName, // ユーザー名を送信
                timestamp: new Date() // タイムスタンプを追加
            });
            setValue(''); // 送信後に入力フィールドをクリア
        }
    };

    return (
        <>
            <h1>Room</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.user} : {msg.content}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Type a message"
                />
                <button type="submit">送信</button>
            </form>
            <button onClick={() => signOut(auth)}>Logout</button>
        </>
    );
};

export default Room;
