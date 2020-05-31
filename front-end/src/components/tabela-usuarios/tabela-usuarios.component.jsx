import React from 'react'
import { Table, Card, Button } from 'antd'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectUsuariosReducer } from '../../redux/usuariosReducer/usuarios-selector'
import columns from './column'

const TabelaUsuarios = ({ usuarios, setLocalState, localState, deletarUser }) => {

  const extra = (
    localState.addTrigger === false ?
    <Button key='adicionar' type='primary' size='large' onClick={() => setLocalState({...localState, addTrigger: true})}>
      Adicionar Usuário
    </Button>
    :
    null
  )

  return (
    <div className='section-table'>
      <Card
        title='Usuários'
        style={{ width: '100%' }}
        actions={[
          extra
        ]}
        bodyStyle={{padding: '0'}}
      >
        <Table size='large' pagination={false} columns={columns(deletarUser)} dataSource={usuarios} loading={usuarios.length === 0} rowKey='id' />
      </Card>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  usuarios: selectUsuariosReducer
})

export default connect(mapStateToProps)(TabelaUsuarios);