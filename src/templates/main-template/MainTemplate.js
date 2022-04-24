import React, { useContext } from 'react';
import { Layout } from 'antd';
import Sidebar from '../../layout/Sidebar';
import NavBar from '../../layout/Navbar';
import TopicMenu from '../../layout/Menu';
import { UserAuthenticationContext } from 'components/providers/UserAuthenticationProvider';
import { Container } from 'pages/intro-page';

function App({ children }) {
    const { isLoggedIn } = useContext(UserAuthenticationContext);

    if (!isLoggedIn) {
        return <Container>{children}</Container>;
    }

    const Menu = <TopicMenu />;
    return (
        <div className="App">
            <NavBar menu={Menu} />
            <Layout>
                <Sidebar menu={Menu} />

                <Layout.Content className="content">{children}</Layout.Content>
            </Layout>
        </div>
    );
}

export default App;
