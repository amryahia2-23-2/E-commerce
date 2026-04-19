
import Logo from './Logo'

function CopyRight() {
    return (
        <div className='py-6 border-t text-center text-sm text-gray-600'>
            <div>&copy; {new Date().getFullYear()} 
                    <Logo className='text-sm ms-1'/>
                . All rights reserved.
            </div>
        </div>
    )
}

export default CopyRight
