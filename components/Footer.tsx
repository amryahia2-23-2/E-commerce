import React from 'react'
import Container from './Container'
import FooterTop from './FooterTop'
import FooterBottom from './FooterBottom'
import CopyRight from './CopyRight'

function Footer() {
    return (
       <footer className='bg-white border-t'>
        <Container>
           <FooterTop />
           <FooterBottom/>
           <CopyRight />
        </Container>
       </footer>
    )
}

export default Footer

