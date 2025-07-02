import { Link } from 'react-router-dom';


export default function ALink({src,className='',label='',onClick,children}) {
    
    return (<>
        <Link to={src} className={className} aria-label={label} onClick={onClick}>
            {children}
        </Link>
    </>);
}