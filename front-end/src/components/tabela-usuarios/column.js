import React from 'react'
import { Button, Tag } from 'antd'

const columns = (deletarUser) => [
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome'
  },
  {
    title: 'Login',
    dataIndex: 'login',
    key: 'login'
  },
  {
    title: 'Telefone(s)',
    dataIndex: 'telefones',
    key: 'telefones',
    render: telefones =>
        telefones.length > 0 ?
        telefones.map(
          (telefone, i) => 
            <Tag key={i} color='blue'>{ telefone.numero }</Tag>
        )
        :
        <p key=''>Não possui</p>
  },
  {
    title: 'Ações',
    dataIndex: 'id',
    key: 'id',
    render: id => <Button key={id} type='primary' danger shape='round' onClick={() => deletarUser(id)}>
      Deletar
    </Button>
  }
]

export default columns