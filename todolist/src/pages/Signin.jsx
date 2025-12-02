import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <section className="signin-section bg-blue-50">
      <div className="text-3xl text-blue-500 ">Signin</div>
      <p>
        <Link to="/">Home으로</Link>
      </p>
    </section>
  );
}
