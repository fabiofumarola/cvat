import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';

import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import {
    Col,
    Row
} from 'antd';


import { registerAsync } from '../actions/auth-actions';
import RegisterForm, { RegisterData } from '../components/register-form';
import { AuthState } from '../reducers/auth-reducer';

interface StateToProps {
    auth: AuthState;
}

interface DispatchToProps {
    register: (registerData: RegisterData) => void;
}

function mapStateToProps(state: any): StateToProps {
    return {
        auth: state.auth,
    };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        register: (registerData: RegisterData) => dispatch(registerAsync(registerData))
    }
}

type RegisterPageProps = StateToProps & DispatchToProps & RouteComponentProps;
class RegisterPage extends React.PureComponent<RegisterPageProps> {
    constructor(props: RegisterPageProps) {
        super(props);
    }

    public render() {
        const { registerError } = this.props.auth;
        const sizes = {
            xs: { span: 14 },
            sm: { span: 14 },
            md: { span: 10 },
            lg: { span: 4 },
            xl: { span: 4 },
        }

        return (
            <Row type='flex' justify='center' align='middle'>
                <Col {...sizes}>
                    <Title level={2}> Create an account </Title>
                    <RegisterForm onSubmit={this.props.register}/>
                    { registerError &&
                        <Row>
                            <Col>
                                <Text type="danger"> { registerError.message } </Text>
                            </Col>
                        </Row>
                    }
                    <Row type='flex' justify='start' align='top'>
                        <Col>
                            <Text strong>
                                Have you been already registered? <Link to="/auth/login"> Login </Link>
                            </Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterPage));
