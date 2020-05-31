import React from 'react'
import { Button, Tag, Space } from 'antd'

const columns = (deletarUser, setLocalState, usuarios) => [
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
    render: id => <Space>
      <Button type='primary' shape='round' onClick={() => {
          const user = usuarios.filter(usuario => usuario.id === id);
          setLocalState({
            addTrigger: true,
            usuario: {
              id: user[0].id,
              nome: user[0].nome,
              login: user[0].login,
              senha: user[0].senha,
              telefones: user[0].telefones.map(telefone => telefone.numero),
            }
          })
        }}
      >
        Editar
      </Button>
      <Button key={id} type='primary' danger shape='round' onClick={() => deletarUser(id)}>
        Deletar
      </Button>
    </Space>
  }
]

export default columns