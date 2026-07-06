import { useState } from 'react';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [sent, setSent] = useState(false);
  const canSubmit = form.name.trim() && form.email.trim() && form.type && form.message.trim();
  const submit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    const subject = encodeURIComponent(`Portfolio inquiry: ${form.type}`);
    const body = encodeURIComponent(`お名前: ${form.name}\nメール: ${form.email}\n相談内容: ${form.type}\n\n${form.message}`);
    window.location.href = `mailto:toki.zeno.0508@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="page-enter">
      <section className="page-header simple">
        <div className="wrap contact-layout">
          <div>
            <h1 className="page-title">Contact</h1>
            <p className="page-kicker">お問い合わせ</p>
            <p className="page-body">制作のご依頼、共同制作のご相談、3Dデータの利用についてなど、お気軽にご連絡ください。内容を確認の上、できるだけ早く返信いたします。</p>
            <div className="contact-info">
              <p><strong>Email</strong><br/><a href="mailto:toki.zeno.0508@gmail.com">toki.zeno.0508@gmail.com</a></p>
              <p><strong>Location</strong><br/>Japan</p>
              <p><strong>SNS</strong><br/>X / GitHub / Instagram</p>
            </div>
          </div>
          <form className="contact-card" onSubmit={submit}>
            <div className="field">
              <label>お名前</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="例）新井 太郎" required/>
            </div>
            <div className="field">
              <label>メールアドレス</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="例）example@gmail.com" required/>
            </div>
            <div className="field">
              <label>お問い合わせの種類</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required>
                <option value="">選択してください</option>
                <option>制作の相談</option>
                <option>3Dデータについて</option>
                <option>コラボレーション</option>
                <option>その他</option>
              </select>
            </div>
            <div className="field">
              <label>メッセージ</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="ご相談内容をご記入ください" required/>
            </div>
            <button type="submit" className="submit-btn" disabled={!canSubmit}>{sent ? 'メール作成を開きました' : '送信する'}</button>
          </form>
        </div>
      </section>
    </div>
  );
}

