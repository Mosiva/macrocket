import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import s from './GUsers.module.css'

type SearchUserType = {
    login: string
    id: number
}

type SearchResult = {
    items: SearchUserType[]
}

type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}



type SearchPropsType = {
    value: string,
    onSubmit: (fixedValue: string) => void
}

export const GSearch = (props: SearchPropsType) => {

    const [tempSearch, setTempSearch] = useState('')

    useEffect(() => {
        setTempSearch(props.value)
    },
        [props.value])

    return (
        <div>
            <input placeholder='search' value={tempSearch} onChange={(e) => { setTempSearch(e.currentTarget.value) }} /> <button onClick={() => {
                props.onSubmit(tempSearch)
            }}>find</button>
        </div>
    )
}




type GUserListPropsType = {
    term: string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void

}
export const GUsersList = (props: GUserListPropsType) => {
    const [users, setUsers] = useState<SearchUserType[]>([])
    useEffect(() => {
        console.log('SYNC USERS');
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [props.term])

    return (
        <ul>
            {users.map(u => <li key={u.id} className={props.selectedUser === u ? s.selected : ''} onClick={() => {
                props.onUserSelect(u)
            }}>{u.login}</li>)}
        </ul>
    )
}

type TimerProps = {
    seconds: number
    onChange: (actualSeconds: number) => void
}
export const GTimer = (props: TimerProps) => {
    const [seconds, setSeconds] = useState(props.seconds)

    useEffect(() => {
        setSeconds(props.seconds)
    }, [props.seconds])

    useEffect(() => {
        props.onChange(seconds)
    }, [seconds])
    useEffect(() => {
        setInterval(() => {
            console.log('tick')
            setSeconds((prev) => prev - 1)
        }, 1000)
    }, [])
    return (
        <div>{seconds}</div>
    )
}



type GUserDetailsPropsType = {
    user: SearchUserType | null
}
export const GUserDetails = (props: GUserDetailsPropsType) => {
    const startTimerSeconds = 10
    const [userDetails, setUserDetails] = useState<null | UserType>(null) //details
    const [seconds, setSeconds] = useState(startTimerSeconds)

    useEffect(() => {
        console.log('SYNC USERS details');
        if (!!props.user) {
            axios
                .get<UserType>(`https://api.github.com/users/${props.user.login}`)
                .then(res => {
                    setUserDetails(res.data)
                    setSeconds(startTimerSeconds)
                })
        }
    }, [props.user])

    useEffect(() => {
        if (seconds < 1) {
            setUserDetails(null)
        }
    }, [seconds])
    return (
        <div>
            {userDetails && <div>
                <GTimer seconds={seconds} onChange={setSeconds} />
                <h2> {userDetails.login}</h2>
                <img src={userDetails.avatar_url} />
                <br />
                {userDetails.login}, followers: {userDetails.followers}
            </div>}
        </div>
    )
}
const GUsers = () => {
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null) //user selected

    let initialSearchState = 'mosiva'
    const [searchTerm, setSearchTerm] = useState(initialSearchState)  //button


    useEffect(() => {
        console.log('SYNC TAB TITLE');
        if (selectedUser) {
            document.title = selectedUser.login
        }

    }, [selectedUser])

    return (
        <Container>
            <br />
            <Row>
                <Col>
                    <GSearch value={searchTerm} onSubmit={(value: string) => { setSearchTerm(value) }} />
                    <Button onClick={() => setSearchTerm(initialSearchState)}>reset</Button>
                    <GUsersList term={searchTerm} selectedUser={selectedUser} onUserSelect={setSelectedUser} />
                </Col>
                <Col>
                    <GUserDetails user={selectedUser} />
                </Col>
            </Row>
        </Container>
    )
}
export default GUsers