import React from 'react'
import { Table, Card, Button } from 'antd'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectUsuariosReducer } from '../../redux/usuariosReducer/usuarios-selector'
import { deletarUser } from '../../redux/usuariosReducer/usuarios-action'
import columns from './column'

const TabelaUsuarios = ({ usuarios, setLocalState, localState, deletarUser, alterarUser }) => {

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
        <Table size='large' pagination={false} columns={columns(deletarUser, setLocalState, usuarios)} dataSource={usuarios} loading={usuarios.length === 0} rowKey='id' />
      </Card>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  usuarios: selectUsuariosReducer
})

const mapDispatchToProps = dispatch => ({
  // alterarUser: id => dispatch(alterarUser(id)),
  deletarUser: id => dispatch(deletarUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TabelaUsuarios);