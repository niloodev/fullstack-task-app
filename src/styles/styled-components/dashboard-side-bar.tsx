// import react
import React from 'react'

// framer-motion integration with styled-components + material.ui
import { HTMLMotionProps, motion } from 'framer-motion'
import Styled from 'styled-components'

const SideBarStyled = Styled(motion.div)`
    border-radius: 5px;
    grid-area: side;
    /* background-color: ${props => props.theme.palette.secondary.main}; */
    background-color: red;
`

export default function SideBar(props: HTMLMotionProps<'div'>) {
    return <SideBarStyled></SideBarStyled>
}
