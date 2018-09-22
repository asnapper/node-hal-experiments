export interface User {
    id: number
    name: string
}

export interface Group {
    id: number
    name: string
    members: number[]
}

export const mockUsers: User[] = [
    { id: 1, name: 'user1' },
    { id: 2, name: 'user2' },
    { id: 3, name: 'user3' },
    { id: 4, name: 'user4' },
    { id: 5, name: 'user5' }
]

export const mockGroups: Group[] = [
    { id: 1, name: 'group1', members: [ 1, 2, 3, 4, 5 ] },
    { id: 2, name: 'group2', members: [ 1, 2 ] },
    { id: 3, name: 'group3', members: [ 3, 4 ] },
    { id: 4, name: 'group4', members: [ 3, 4, 5 ] },
    { id: 5, name: 'group5', members: [ 1, 2, 3 ] }
]
