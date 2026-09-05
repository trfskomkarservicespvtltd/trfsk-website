export default function SignOutButton() {
  return <form action="/auth/signout" method="post"><button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-white">Sign out</button></form>;
}