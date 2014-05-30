<div id="main" class="bb x-panel-bwrap" ng-app="nvd3TestApp">
    <div class="header">
        <h3>Google Analytics</h3>
    </div>

    <div class="wrapper">
        <nav class="tab-nav">
            <ul>
                <li class="active">
                    <a href="">Content</a>
                </li>
                <li>
                    <a href="">Audience</a>
                </li>
                <li>
                    <a href="">Traffic sources</a>
                </li>
            </ul>
        </nav>
    </div>

    <div class="wrapper" ng-controller="ExampleCtrl">
        <nvd3-line-chart
                data="exampleData"
                id="exampleId"
                height="320"
                color="themeColor()"
                legendColor="themeColor()"
                showXAxis="true"
                showYAxis="true"
                y="yFunction()"
                showLegend="true"
                useInteractiveGuideLine="true"
                tooltips="true"
                xAxisTickFormat="xAxisTickFormat()"
                yAxisShowMaxMin="false"
                xAxisShowMaxMin="false"
                >
        </nvd3-line-chart>

    </div>

    <div class="grid">
        <div class="unit two-thirds">
            <table class="table">
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Pageviews</th>
                        <th>Unique views</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="url">/home.htm</td>
                        <td>494</td>
                        <td>323</td>
                    </tr>
                    <tr>
                        <td class="url">/another-great-address.htm</td>
                        <td>480</td>
                        <td>302</td>
                    </tr>
                    <tr>
                        <td class="url">/an-adress.htm</td>
                        <td>352</td>
                        <td>254</td>
                    </tr>
                    <tr>
                        <td class="url">/bla-bla-bla.htm</td>
                        <td>302</td>
                        <td>154</td>
                    </tr>
                    <tr>
                        <td class="url">/profile.htm</td>
                        <td>184</td>
                        <td>56</td>
                    </tr>
                    <tr>
                        <td class="url">/about.htm</td>
                        <td>56</td>
                        <td>23</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="unit one-third">
            <table class="table dark">
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Pageviews</th>
                        <th>Unique views</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>/home.htm</td>
                        <td>494</td>
                        <td>323</td>
                    </tr>
                    <tr>
                        <td>/another-great-address.htm</td>
                        <td>480</td>
                        <td>302</td>
                    </tr>
                    <tr>
                        <td>/an-adress.htm</td>
                        <td>352</td>
                        <td>254</td>
                    </tr>
                    <tr>
                        <td>/bla-bla-bla.htm</td>
                        <td>302</td>
                        <td>154</td>
                    </tr>
                    <tr>
                        <td>/profile.htm</td>
                        <td>184</td>
                        <td>56</td>
                    </tr>
                    <tr>
                        <td>/about.htm</td>
                        <td>56</td>
                        <td>23</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="grid">
        <div class="unit two-thirds">
            <table class="table">
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Pageviews</th>
                        <th>Unique views</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="url">/home.htm</td>
                        <td>494</td>
                        <td>323</td>
                    </tr>
                    <tr>
                        <td class="url">/another-great-address.htm</td>
                        <td>480</td>
                        <td>302</td>
                    </tr>
                    <tr>
                        <td class="url">/an-adress.htm</td>
                        <td>352</td>
                        <td>254</td>
                    </tr>
                    <tr>
                        <td class="url">/bla-bla-bla.htm</td>
                        <td>302</td>
                        <td>154</td>
                    </tr>
                    <tr>
                        <td class="url">/profile.htm</td>
                        <td>184</td>
                        <td>56</td>
                    </tr>
                    <tr>
                        <td class="url">/about.htm</td>
                        <td>56</td>
                        <td>23</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="unit one-third">
            <table class="table dark">
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Pageviews</th>
                        <th>Unique views</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>/home.htm</td>
                        <td>494</td>
                        <td>323</td>
                    </tr>
                    <tr>
                        <td>/another-great-address.htm</td>
                        <td>480</td>
                        <td>302</td>
                    </tr>
                    <tr>
                        <td>/an-adress.htm</td>
                        <td>352</td>
                        <td>254</td>
                    </tr>
                    <tr>
                        <td>/bla-bla-bla.htm</td>
                        <td>302</td>
                        <td>154</td>
                    </tr>
                    <tr>
                        <td>/profile.htm</td>
                        <td>184</td>
                        <td>56</td>
                    </tr>
                    <tr>
                        <td>/about.htm</td>
                        <td>56</td>
                        <td>23</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="grid">
        <div class="unit two-thirds">
            <table class="table">
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Pageviews</th>
                        <th>Unique views</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="url">/home.htm</td>
                        <td>494</td>
                        <td>323</td>
                    </tr>
                    <tr>
                        <td class="url">/another-great-address.htm</td>
                        <td>480</td>
                        <td>302</td>
                    </tr>
                    <tr>
                        <td class="url">/an-adress.htm</td>
                        <td>352</td>
                        <td>254</td>
                    </tr>
                    <tr>
                        <td class="url">/bla-bla-bla.htm</td>
                        <td>302</td>
                        <td>154</td>
                    </tr>
                    <tr>
                        <td class="url">/profile.htm</td>
                        <td>184</td>
                        <td>56</td>
                    </tr>
                    <tr>
                        <td class="url">/about.htm</td>
                        <td>56</td>
                        <td>23</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="unit one-third">
            <table class="table dark">
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Pageviews</th>
                        <th>Unique views</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>/home.htm</td>
                        <td>494</td>
                        <td>323</td>
                    </tr>
                    <tr>
                        <td>/another-great-address.htm</td>
                        <td>480</td>
                        <td>302</td>
                    </tr>
                    <tr>
                        <td>/an-adress.htm</td>
                        <td>352</td>
                        <td>254</td>
                    </tr>
                    <tr>
                        <td>/bla-bla-bla.htm</td>
                        <td>302</td>
                        <td>154</td>
                    </tr>
                    <tr>
                        <td>/profile.htm</td>
                        <td>184</td>
                        <td>56</td>
                    </tr>
                    <tr>
                        <td>/about.htm</td>
                        <td>56</td>
                        <td>23</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
