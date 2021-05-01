import React, {useRef, useState} from 'react'
import Button from '../components/Button'
import Container from '../components/Container'
import FormBody from '../components/FormBody'
import FormHeader from "../components/FormHeader"
import Input from '../components/Input'
import InputGroup from '../components/InputGroup'
import InputList from '../components/InputList'
import TextArea from '../components/TextArea'
import FileUpload from "../components/FileUpload";

export default function CreateProject() {
    return (
        <Container>
            <FormHeader
                title="Projetos Públicos"
                description="Cadastre um novo projeto público no Dataurbe"/>

            <FormBody>
                <div className="p-2 w-full">
                    <div className="relative">
                        <InputGroup name="name" label="Nome">
                            <Input/>
                        </InputGroup>
                    </div>
                </div>
                <div className="p-2 w-full">
                    <div className="relative">
                        <InputGroup name="description" label="Descrição">
                            <TextArea/>
                        </InputGroup>
                    </div>
                </div>
                <div className="p-2 w-full">
                    <div className="relative">
                        <InputGroup name="objectives" label="Objetivos">
                            <InputList defaultValue={[{value: "", error: false}]} addButtonText="Adicionar Objetivo"/>
                        </InputGroup>
                    </div>
                </div>
                <div className="p-2 w-full">
                    <div className="relative">
                        <InputGroup name="objectives" label="Outras informações">
                            <InputList defaultValue={[{value: "", error: false}]} addButtonText="Adicionar"/>
                        </InputGroup>
                    </div>
                </div>
                <div className="p-2 w-full">
                    <div className="relative">
                        <InputGroup name="images" label="Imagens">
                            <FileUpload/>
                        </InputGroup>
                    </div>
                </div>
                <div className="border-t border-gray-200 w-full my-4"/>
                <div className="p-2 w-full text-center">
                    <Button color="blue" textSize="xl" className="mx-auto px-8 mb-2">Cadastrar no Dataurbe</Button>
                    <span className="text-gray-500 text-sm">Clique para cadastrar este projeto público no Dataurbe</span>
                </div>
            </FormBody>
        </Container>
    )
}
