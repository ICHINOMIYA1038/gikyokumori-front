import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

async function sendPageContent(content: any, router:any): Promise<void> {
  
  try {
    const URL = `${process.env.NEXT_PUBLIC_RAILS_API}/users/`;
    await axios.post(URL, content, {
      headers: {
        'Content-Type': 'application/json'
      }
    }); // POST先のURLを適切なものに置き換える
    
    router.push("/users")
  } catch (error) {
    console.error('Error while sending page content:', error);
    throw error;
  }
  
}

const UsersForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // フォームの送信処理を実装する
    const content = {
      user: {
        name: name,
        email: email
      }
    };
    sendPageContent(content,router)
    
    // フォーム送信後にフォーム  をリセットする
    setName('');
    setEmail('');
    setPassword('');

    // ユーザー登録後にリダイレクトする例
    //router.push('/success'); // ユーザー登録が成功した場合の遷移先を指定
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>New User Registration</h1>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>


      <button type="submit">Register</button>
    </form>
  );
};

export default UsersForm;