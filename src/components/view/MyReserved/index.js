import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
 import MyReserved from "../../MyReserved";
 import MyReserve from "../../MyReserved/MyReserve/MyReserve";
import Detail from "../../MyReserved/MyClassess/detail";



class App extends Component {
    render() {
        const { match } = this.props;

        return (


                <div className="w-100">
                    <Suspense fallback={<div className="loading" />}>
                        <Switch>
                            <Redirect exact from={`${match.url}`} to={`${match.url}/main`} />

                            <Route
                                path={`${match.url}/main`}
                                render={props => <MyReserved {...props} />}
                            />

                            <Route
                                path={`${match.url}/reserve/:id`}
                                render={props => <MyReserve {...props} />}
                            />
                            <Route
                                path={`${match.url}/class/:id`}
                                render={props => <Detail {...props} />}
                            />


                            <Redirect to="/error" />
                        </Switch>
                    </Suspense>
                </div>


        );
    }
}
const mapStateToProps = ({ menu }) => {
    const { containerClassnames } = menu;
    return { containerClassnames };
};

export default withRouter(App);
    // connect(
    //     mapStateToProps,
    //     {}
    // )(App)
// );
