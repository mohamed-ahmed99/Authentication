
import Link from "next/link";

export default function Home() {

  console.log('hello')
  


  return (
    <div className="overflow-hidden">
          <div><Link href='/register'>register</Link></div>
          <div><Link href='/login'>login</Link></div>
          <div><Link href='/verify-email'>verify-email</Link></div> 
          <div><Link href='/profile'>profile</Link></div> 
    </div>
  );
}
